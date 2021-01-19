import { Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';

type Props = { data: any; status?: number; statusText?: string };

export const getMockedHttpResponse = <T>({
  data,
  status = 200,
  statusText = 'ok',
}: Props): Observable<AxiosResponse<T>> => {
  return of({
    data,
    headers: {},
    config: { url: 'http://localhost:3000/mockUrl' },
    status,
    statusText,
  });
};
