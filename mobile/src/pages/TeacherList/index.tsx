import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

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
                  style={styles.input}
                  placeholder="Qual horario?"
                  placeholderTextColor="#c1bccc"
                />  
              </View>
            </View>
            <RectButton style={styles.submitButton}>
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
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </ScrollView>
    </View>
  )
}

export default TeacherList