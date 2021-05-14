import React, {useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
  StyleSheet,
} from 'react-native';

const {width} = Dimensions.get('window');

const style = {
  justifyContent: 'center',
  alignItems: 'center',
  width: width,
  height: 50,
  flex: 1,
  borderWidth: 1,
};

const COLORS = ['deepskyblue', 'fuchsia', 'lightblue '];

function getData(number) {
  let data = [];
  for (let i = 0; i < number; ++i) {
    data.push('' + i);
  }
  return data;
}

const ScrollToExample = props => {
  const flatListRef = useRef();

  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  });

  const getColor = index => {
    const mod = index % 3;
    return COLORS[mod];
  };

  const scrollToIndex = () => {
    let randomIndex = Math.floor(Math.random(Date.now()) * props.data.length);
    flatListRef.current.scrollToIndex({animated: true, index: randomIndex});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          onPress={scrollToIndex}
          title="Tap to scrollToIndex"
          color="darkblue"
        />
      </View>
      <FlatList
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}
        ref={ref => (flatListRef.current = ref)}
        keyExtractor={item => item}
        getItemLayout={getItemLayout}
        initialScrollIndex={50}
        initialNumToRender={2}
        renderItem={({item, index}) => (
          <View style={{...style, backgroundColor: getColor(index)}}>
            <Text>{item}</Text>
          </View>
        )}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    backgroundColor: 'darkturquoise',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function App() {
  return <ScrollToExample data={getData(100)} />;
}

export default App;
