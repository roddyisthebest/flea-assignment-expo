import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';
import EventSource from 'react-native-sse';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HorizontalScroll from '../components/HorizontalScroll';
import Label from '../components/Label';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [random, setRandom] = useState<number[]>([
    Math.random(),
    Math.random(),
  ]);
  const [data, setData] = useState<{ viewCount: number; auctionId: number }[]>([
    { auctionId: 2127, viewCount: 120 },
    { auctionId: 2128, viewCount: 143 },
    { auctionId: 2130, viewCount: 76 },
    { auctionId: 2131, viewCount: 89 },
    { auctionId: 2126, viewCount: 62 },
    { auctionId: 2135, viewCount: 58 },
    { auctionId: 2129, viewCount: 69 },
    { auctionId: 2132, viewCount: 65 },
    { auctionId: 2134, viewCount: 56 },
    { auctionId: 2136, viewCount: 43 },
    { auctionId: 2140, viewCount: 54 },
    { auctionId: 2137, viewCount: 83 },
    { auctionId: 2138, viewCount: 49 },
    { auctionId: 2139, viewCount: 37 },
    { auctionId: 2141, viewCount: 80 },
    { auctionId: 2142, viewCount: 55 },
    { auctionId: 2123, viewCount: 113 },
    { auctionId: 2124, viewCount: 51 },
    { auctionId: 2125, viewCount: 67 },
    { auctionId: 2133, viewCount: 84 },
    { auctionId: 2145, viewCount: 45 },
    { auctionId: 2146, viewCount: 44 },
    { auctionId: 2150, viewCount: 58 },
    { auctionId: 2151, viewCount: 69 },
    { auctionId: 2147, viewCount: 33 },
    { auctionId: 2148, viewCount: 19 },
    { auctionId: 2153, viewCount: 45 },
    { auctionId: 2158, viewCount: 47 },
    { auctionId: 2154, viewCount: 27 },
    { auctionId: 2155, viewCount: 19 },
    { auctionId: 2156, viewCount: 23 },
    { auctionId: 2157, viewCount: 31 },
    { auctionId: 2143, viewCount: 51 },
    { auctionId: 2144, viewCount: 44 },
    { auctionId: 2149, viewCount: 44 },
    { auctionId: 2152, viewCount: 80 },
  ]);

  const [sseEvent, setSseEvent] = useState<{
    data: string;
    lastEventId: number;
    type: 'sse.auction_viewed';
    url: string;
  }>({
    data: '{}',
    lastEventId: 0,
    type: 'sse.auction_viewed',
    url: '',
  });

  type MyCustomEvents = 'sse.auction_viewed' | 'open';

  useEffect(() => {
    const eventSource = new EventSource<MyCustomEvents>(
      'https://api.fleaauction.world/v2/sse/event'
    );

    const connectToSSE = async () => {
      try {
        eventSource.addEventListener('sse.auction_viewed', (event: any) =>
          setSseEvent(event)
        );
      } catch (e) {
        console.log(e);
      }
    };
    connectToSSE();
    return () =>
      eventSource.removeEventListener('sse.auction_viewed', (event: any) =>
        setSseEvent(event)
      );
  }, []);

  useEffect(() => {
    const JSONDATA = JSON.parse(sseEvent.data);
    console.log(JSONDATA);

    setData((prev) =>
      prev.map((d) => {
        if (d.auctionId === JSONDATA.auctionId) {
          return {
            auctionId: d.auctionId,
            viewCount: JSONDATA.viewCount,
          };
        } else {
          return d;
        }
      })
    );
  }, [sseEvent]);

  const onRefresh = () => {
    setRandom([Math.random(), Math.random()]);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.body}>
            <Label text="가로 스크롤 영역 #1"></Label>
            <HorizontalScroll data={data} random={random[0]}></HorizontalScroll>
            <Label text="가로 스크롤 영역 #2"></Label>
            <HorizontalScroll data={data} random={random[1]}></HorizontalScroll>
          </View>
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={styles.flatListWrapper}
        data={[]}
        renderItem={() => null}
      />

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 10,
  },
  flatListWrapper: {
    backgroundColor: 'white',
  },
});

export default Home;
