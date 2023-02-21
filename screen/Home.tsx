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
  const [data, setData] = useState<{ viewCount: number; auctionId: number }[]>(
    [
      { auctionId: 2206, viewCount: 120 },
      { auctionId: 2207, viewCount: 143 },
      { auctionId: 2208, viewCount: 76 },
      { auctionId: 2209, viewCount: 89 },
      { auctionId: 2210, viewCount: 62 },
      { auctionId: 2211, viewCount: 58 },
      { auctionId: 2212, viewCount: 69 },
      { auctionId: 2213, viewCount: 65 },
      { auctionId: 2214, viewCount: 56 },
      { auctionId: 2215, viewCount: 43 },
      { auctionId: 2216, viewCount: 54 },
      { auctionId: 2217, viewCount: 83 },
      { auctionId: 2218, viewCount: 49 },
      { auctionId: 2219, viewCount: 37 },
      { auctionId: 2220, viewCount: 80 },
      { auctionId: 2221, viewCount: 55 },
      { auctionId: 2180, viewCount: 113 },
      { auctionId: 2181, viewCount: 51 },
      { auctionId: 2282, viewCount: 67 },
      { auctionId: 2283, viewCount: 84 },
      { auctionId: 2284, viewCount: 45 },
      { auctionId: 2285, viewCount: 44 },
      { auctionId: 2286, viewCount: 58 },
      { auctionId: 2287, viewCount: 69 },
      { auctionId: 2288, viewCount: 33 },
      { auctionId: 2289, viewCount: 19 },
      { auctionId: 2290, viewCount: 45 },
      { auctionId: 2291, viewCount: 47 },
      { auctionId: 2292, viewCount: 27 },
      { auctionId: 2293, viewCount: 19 },
      { auctionId: 2294, viewCount: 23 },
      { auctionId: 2295, viewCount: 31 },
      { auctionId: 2296, viewCount: 51 },
      { auctionId: 2297, viewCount: 44 },
      { auctionId: 2298, viewCount: 44 },
      { auctionId: 2299, viewCount: 80 },
    ].sort(() => Math.random() - 0.5)
  );

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
            {/* <HorizontalScroll data={data} random={random[1]}></HorizontalScroll> */}
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
