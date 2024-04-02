import { View, Text, ScrollView, Image, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Categories from '../components/Categories';
import axios from 'axios'
import Recipes from '../components/Recipes';

const HomeScreen = () => {

  const [activeCategory, setActiveCategory] = useState('Beef')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])

  useEffect(() => {
    getCategories()
    getRecipes()
  }, [])

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      if(response && response.data) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.log('Error message --> ', error.message)
    }
  }

  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      if(response && response.data) {
        setMeals(response.data.meals)
      }
    } catch (error) {
      console.log('Error message --> ', error.message)
    }
  }

  const handleChangeCategory = category => {
    setMeals([])
    getRecipes(category)
    setActiveCategory(category)
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='dark' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className='space-y-6'
      >
        {/* Avatar and bell icon */}
        <View className='mx-4 flex-row justify-between items-center mb-2'>
          <Image 
            source={require('../../assets/avatar.png')}
            className='h-16 w-16'
          />
          <BellIcon size={30} color='gray'/>
        </View>

        {/* greeting and punchline */}
        <View className='mx-4 space-y-2 mb-2'>
          <Text className='text-neutral-600' style={{fontSize: hp(1.7)}}>Hello, Icarus!</Text>
          <View>
            <Text className='font-semibold text-neutral-600' style={{fontSize: hp(3.8)}}>Make your own food, </Text>
          </View>
          <Text className='font-semibold text-neutral-600' style={{fontSize: hp(3.8)}}>
            Stay at 
            <Text className='text-amber-400'> home</Text>
          </Text>
        </View>

        {/* Search bar */}
        <View className='bg-black/5 mx-4 flex-row items-center rounded-lg p-[15px]'>
          <MagnifyingGlassIcon 
            color={'gray'}
          />
          <TextInput 
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{fontSize: 14, lineHeight: 20}}
            className='mb-1 pl-3 tracking-wider'
          />
        </View>

        {/* Categories */}
        <View>
          { categories.length > 0 &&
            <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>

        {/* Recipes */}
        <View>
          <Recipes categories={categories} meals={meals}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen