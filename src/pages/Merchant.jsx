import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
const Merchant = ({navigation, route}) => {
  const {setMerchant} = route.params;
  const handlePress = item => {
    navigation.goBack();
    setMerchant(item);
  };
  const merchants = useSelector(state => state.global.merchants);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item.item)}>
        <View style={[styles.item,{flexDirection:'row'}]}>
        <Icon
          name={'checkmark-circle'}
          size={20}
          color="#37517E"
          onPress={() => navigation.goBack()}
        />
          <Text style={styles.itemText}>{item.item.merchantName}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#37517E',
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Icon
          name={'arrow-back'}
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontWeight: '900',
          }}>
          Select merchant
        </Text>
      </View>
      <View style={{top: 50}}>
        <FlatList
          data={merchants}
          renderItem={item => renderItem({item})}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <Text style={styles.nodataText}>no merchant</Text>
          )}
          keyboardShouldPersistTaps={'always'}
          keyboardDismissMode="on-drag"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.18)',
  },
  itemText: {
    fontSize: 14,
    paddingHorizontal:10
  },
  nodataText: {
    textAlign: 'center',
    color: '#000',
    marginVertical: 50,
  },
});

export default Merchant;
