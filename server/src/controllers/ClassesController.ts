import { Request, Response } from 'express'
import db from '../database/connection'
import convertHourToMinute from '../utils/convertHourToMinute'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

export default class ClassController {
  async index(request: Request, response: Response) {
    const filters = request.query
    const subject = <string>filters.subject
    const week_day = <string>filters.week_day
    const time = <string>filters.time
    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeInMinutes = convertHourToMinute(time)
    try {
      const classes = await <Promise<any>>db('classes')
        .whereExists(function() {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [+week_day])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
  
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*'])
  
      return response.send(classes)

    } catch (err) {
      return response.status(400).send({
        error: `couldn't return, error: ${err}`
      })
    }
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body
  
    const trx = await db.transaction()
  
    try {
      const insertedUsersIds = await <Promise<any>>trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      })
      
      const user_id = insertedUsersIds[0]
    
      const insertedClassesId = await <Promise<any>>trx('classes').insert({
        subject,
        cost,
        user_id
      })
    
      const class_id = insertedClassesId[0]
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinute(scheduleItem.from),
          to: convertHourToMinute(scheduleItem.to),
        }
      })
    
      await <Promise<any>>trx('class_schedule').insert(classSchedule)
    
      await <Promise<any>>trx.commit()
    
      return response.status(201).send()
    } catch (err) {
      await <Promise<any>>trx.rollback()
      return response.status(400).json({
        error:`unexpect error while creating new class: ${err}`
      })
    }
  }
}