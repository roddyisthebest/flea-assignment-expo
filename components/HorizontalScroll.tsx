import { StyleSheet, FlatList, View } from 'react-native';
import Card from './Card';
import DataType from '../types/Data';
import { shuffle } from '../util/shuffle';
import { memo } from 'react';
const HorizontalScroll = ({
  data,
  random,
}: {
  data: DataType[];
  random: number;
}) => {
  const renderItem = ({ item }: { item: DataType }) => (
    <Card viewCount={item.viewCount} auctionId={item.auctionId} />
  );

  return (
    <FlatList
      data={shuffle(data, random)}
      horizontal
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.style}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item.auctionId.toString()}
    />
  );
};

export default memo(HorizontalScroll);

const styles = StyleSheet.create({
  style: {
    flexGrow: 0,
    height: 190,
    backgroundColor: '#eaeaea',
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  separator: {
    width: 15,
  },
  contentContainer: {
    padding: 15,
  },
});
