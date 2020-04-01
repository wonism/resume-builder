import { useState, useCallback } from 'react';
import { useObservable, useSubscription } from 'observable-hooks';
import { EMPTY, from } from 'rxjs';
import { filter, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import equal from 'fast-deep-equal';

import { ResumeBody } from '@models/resume';
import { RequestStatus } from '@models/common';
import { generatePdf } from '@utils/pdf';
import { fileToBase64 } from '@utils/data';
import { key } from '@constants/storage';

const useBuild = (body: ResumeBody | null) => {
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.IDLE);

  const handleSubscription = useCallback((result) => {
    setResult(result);
    setStatus(RequestStatus.DONE);
  }, [setResult]);

  const preview$ = useObservable(
    inputs$ =>
      inputs$.pipe(
        filter(([body]) => body != null),
        distinctUntilChanged((prev, curr) => equal(prev, curr)),
        tap(([body]) => {
          setStatus(RequestStatus.SENT);
          localStorage.setItem(key, JSON.stringify(body));
        }),
        switchMap(([body]) =>
          from(generatePdf(body!))
            .pipe(
              switchMap(fileToBase64),
              catchError((error) => {
                const message = error.response?.message ?? error.message;

                setStatus(RequestStatus.FAIL);
                alert(message);

                return EMPTY;
              })
            )
        )
      ),
    [body] as const
  );

  useSubscription(
    preview$,
    handleSubscription,
  );

  return [result, status] as const;
};

export default useBuild;
