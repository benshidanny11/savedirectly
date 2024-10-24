import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
const Products = ({navigation, route}) => {
  const {setProduct, selectedMerchant} = route.params;
  const merchants = useSelector(state => state.global.merchants);
  const handlePress = item => {
    navigation.goBack();
    setProduct(item);
  };

  const filterdMerchant = merchants.find(
    item => item.merchantId === selectedMerchant,
  );
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item.item)}>
        <View style={[styles.item, {flexDirection: 'row'}]}>
          <Icon
            name={'checkmark-circle'}
            size={20}
            color="#37517E"
            onPress={() => navigation.goBack()}
          />
          <Text style={style.itemText}>{item.item.merchantProductName}</Text>
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
          Select product
        </Text>
      </View>
      <View style={{top: 50}}>
        <FlatList
          data={filterdMerchant.products}
          renderItem={item => renderItem({item})}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <Text style={styles.nodataText}>
              no products for selected merchant
            </Text>
          )}
          keyboardShouldPersistTaps={'always'}
          keyboardDismissMode="on-drag"
        />
      </View>
    </View>
  );
};
export default Products;
const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.18)',
  },
  itemText: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
  nodataText: {
    textAlign: 'center',
    color: '#000',
    marginVertical: 50,
  },
});
