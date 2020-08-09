import { Request, Response } from 'express'
import db from '../database/connection'
import convertHourToMinute from '../utils/convertHourToMinute'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

export default class ClassController {
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