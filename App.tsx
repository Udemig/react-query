/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {client} from './src/service/common/Client';
import {APIProvider, queryClient} from './src/service/common/ApiProvicer';
import {usePosts} from './src/service/posts/usePosts';
import {usePost} from './src/service/posts/usePost';
import {useCreatePost} from './src/service/posts/usePostCreate';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const {isLoading, data, isError} = usePosts();

  const {mutate, isLoading: isLoadingCreatePost} = useCreatePost();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const handleAxios = () => client.get('posts');

  if (isError) {
    <Text> Hata oluştu</Text>;
  }

  const onSubmit = () => {
    mutate(
      {
        userId: 1,
        title: 'Furkanın Testi 343',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        onSuccess: apiResponse => {
          const previousTodos = queryClient.getQueryData('posts');

          console.log('previousTodos', previousTodos);

          Alert.alert(`Kaydetme Başarılı ${apiResponse.id}`);
        },
        onError: () => Alert.alert('Bir hata oluştu'),
      },
    );
  };

  return (
    <APIProvider>
      <SafeAreaView style={backgroundStyle}>
        {isLoading && isLoadingCreatePost && <ActivityIndicator />}
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Posts">
              <Text style={styles.highlight}>
                {data?.map(res => res.title)}
                {/* {data?.id} - {data?.title} */}
              </Text>
            </Section>
          </View>
          <Button title="Mutation" onPress={() => onSubmit()} />
        </ScrollView>
      </SafeAreaView>
    </APIProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
