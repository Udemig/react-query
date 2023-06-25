import {useQuery} from 'react-query';
import {client} from '../common/Client';
import {PostsResponse} from './types';

type Response = PostsResponse[];

function fetchPosts(): Promise<Response> {
  return client.get('posts').then(response => response.data);
}

export function usePosts() {
  const second = 1000;
  const minute = 60 * second;
  const fiveMinute = 5 * minute;

  return useQuery<Response>('posts', fetchPosts, {
    staleTime: second,
    cacheTime: fiveMinute,
  });
}
