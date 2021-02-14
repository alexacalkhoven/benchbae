import axios from 'axios';
import React, { useState } from 'react';
import Bench from '../models/Bench';
import Eatery from '../models/Eatery';

interface IBenchBaeContext {
  children: any;
  requestBench: () => Promise<Bench>;
  requestEatery: (bench: Bench) => Promise<Eatery>;
  loading: boolean;
  bench: Bench;
  eatery: Eatery;
}

const API_URL = process.env['REACT_APP_API_URL'] || 'localhost:8000';
const BenchBaeContext = React.createContext<IBenchBaeContext>(null as any);

export const BenchBaeProvider = ({ children }: { children: any }) => {
  const [loading, setLoading] = useState(false);
  const [bench, setBench] = useState<Bench>(null as any);
  const [eatery, setEatery] = useState<Eatery>(null as any);

  const requestBench = (): Promise<Bench> => {
    return new Promise((resolve, reject) => {
      if (loading) {
        reject();
      }

      setLoading(true);

      if (!navigator.geolocation) {
        alert('Sorry, geolocation not supported');
        setLoading(false);

        reject();
      }

      navigator.geolocation.getCurrentPosition(
        (location) => {
          axios
            .get(API_URL + '/closest-bench', {
              params: {
                long: location.coords.longitude,
                lat: location.coords.latitude,
              },
            })
            .then((res) => {
              const bench = res.data as Bench;
              console.log('saved calgary with bench', bench);
              setBench(bench);
              resolve(bench);
            })
            .catch((err) => {
              alert(err);
              reject(err);
            })
            .finally(() => setLoading(false));
        },
        (err) => {
          alert(err);
          setLoading(false);
          reject(err);
        }
      );
    });
  };

  const requestEatery = (bench: Bench): Promise<Eatery> => {
    return new Promise((resolve, reject) => {
      if (!bench) {
        reject('no bench');
      }

      setLoading(true);

      axios
        .get(API_URL + '/closest-eatery', {
          params: {
            lat: bench.latitude,
            long: bench.longitude,
          },
        })
        .then((res) => {
          const eatery = res.data as Eatery;
          console.log(eatery);

          setEatery(eatery);
          resolve(eatery);
        })
        .catch((err) => {
          alert(err);
          reject(err);
        })
        .finally(() => setLoading(false));
    });
  };

  return (
    <BenchBaeContext.Provider
      value={{
        children,
        loading,
        requestBench,
        requestEatery,
        bench,
        eatery,
      }}
    >
      {children}
    </BenchBaeContext.Provider>
  );
};

export default BenchBaeContext;
