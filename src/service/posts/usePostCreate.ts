import {useMutation, useQuery} from 'react-query';
import {client} from '../common/Client';
import {PostsResponse} from './types';

type Response = {id: number};
type Params = PostsResponse;

function fetchCreatePost(params: Params): Promise<Response> {
  return client.post('posts', params).then(response => response.data);
}

export function useCreatePost(params: Params) {
  return useMutation<Response, Params>(() => fetchCreatePost(params));
}
