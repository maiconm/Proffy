import React, { useState } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'
import { useFocusEffect } from '@react-navigation/native'

function TeacherList() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')
  const [teachers, setTeachers] = useState([])

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)
        setFavorites(favoritedTeachersIds)
      }
    })
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFiltersSubmit() {
    loadFavorites()

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    console.log(response.data)

    setTeachers(response.data);
  }

  useFocusEffect(() => {
    loadFavorites()
  })

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponives"
        headerRight={(
          <BorderlessButton>
            <Feather
              name="filter"
              size={20}
              color="#fff"
              onPress={handleToggleFiltersVisible}
            />
          </BorderlessButton>
        )}
      >
        { isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>
              Materia
            </Text>
            <TextInput
              value={subject}
              onChangeText={setSubject}
              style={styles.input}
              placeholder="Qual a materia?"
              placeholderTextColor="#c1bccc"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>
                  Dia da semana
                </Text>
                <TextInput
                  value={week_day}
                  onChangeText={setWeekDay}
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />  
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>
                  Horario
                </Text>
                <TextInput
                  value={time}
                  onChangeText={setTime}
                  style={styles.input}
                  placeholder="Qual horario?"
                  placeholderTextColor="#c1bccc"
                />  
              </View>
            </View>
            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
                <Text style={styles.submitButtonText}>
                  Filtrar
                </Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default TeacherList