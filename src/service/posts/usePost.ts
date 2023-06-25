import {useQuery} from 'react-query';
import {client} from '../common/Client';
import {PostsResponse} from './types';

type Response = PostsResponse;
type Params = {id: number};

function fetchPost({id}: Params): Promise<Response> {
  return client.get(`posts/${id}`).then(response => response.data);
}

export function usePost(params: Params) {
  return useQuery<Response>('post', () => fetchPost(params));
}
