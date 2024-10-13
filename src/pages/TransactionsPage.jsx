import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Transactions from '../components/Transactions'

const TransactionsPage = () => {
  return (
    <View style={{flex: 1}}>
    <View style={{backgroundColor: '#37517E', padding: 10}}>
      <Text
        style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: 18,
          fontWeight: '900',
        }}>
        Transctions 
      </Text>
    </View>
   <ScrollView style={{flex:1}}>
   <Transactions />
   </ScrollView>
    </View>
  )
}

export default TransactionsPage