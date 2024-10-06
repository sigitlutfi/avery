import axios from 'axios';
import { Toast } from 'native-base';
import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { ColorContext } from '../contexts/ColorContext';
import { ConfigContext } from '../contexts/ConfigContext';

const useHttpHelper = () => {
  const { authState, signOut } = useContext(AuthContext);
  const { config } = useContext(ConfigContext);
  const { colors } = useContext(ColorContext);

  const token = authState.userToken;

  const defaultConfig = {
    baseURL: config?.url ? config.url : 'http://api.clovateamwork.com',
  };

  const handleError = (error, c) => {
    let errorMessage = 'Something went wrong';
    let statusCode = 500; // Default status code for server error
    let errorResponse = null;

    if (error.response) {
      try {
        // Cek apakah error.response adalah JSON dengan mengecek property `data`
        if (typeof error.response.data === 'object') {
          errorResponse = error.response.data;
        }
      } catch (e) {
        // Jika error.response bukan JSON, biarkan errorResponse tetap tidak diubah
        console.log('Error response is not valid JSON.');
      }
    }

    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      errorMessage = error.response.data?.message || error.message;
      statusCode = error.response.status;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from the server.';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }

    if (c) {
      console.error('Error details:', error); // Log full error if 'c' is set
    }

    // Optionally, display a toast or snackbar for the user

    if (error.message === 'Token Tidak Valid') {
      Toast.show({
        title: errorMessage,
      });
      signOut();
    } else {
      Toast.show({
        title: errorMessage,
        backgroundColor: colors.red,
      });
    }
    return {
      errorMessage: errorMessage,
      error: errorResponse,
      status: statusCode,
    };
  };

  const POST = async ({
    url,
    json = {},
    data = [],
    headers = {},
    c = false,
    tos = true,
  }) => {
    try {
      const finalUrl = defaultConfig.baseURL + url;
      const finalHeaders = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...headers,
      };

      let requestData;

      if (Object.keys(json).length > 0) {
        requestData = json;
        finalHeaders['Content-Type'] = 'application/json';
      } else {
        requestData = new FormData();
        data.forEach((item) => {
          requestData.append(item.key, item.value);
        });
        finalHeaders['Content-Type'] = 'multipart/form-data';
      }

      const response = await axios.post(finalUrl, requestData, {
        headers: finalHeaders,
      });

      if (c) {
        console.log(response); // Log the full response if 'c' is set
      }

      if (response.data.status === 'success') {
        tos &&
          Toast.show({
            title: response.data.message ? response.data.message : 'Berhasil',
            backgroundColor: colors.green,
          });

        return { data: response.data, status: response.status };
      } else {
        return handleError(
          {
            message: response.data.message ? response.data.message : 'Error -',
          },
          c
        );
      }
    } catch (error) {
      return handleError(error, c);
    }
  };

  const GET = async ({
    url,
    params = {},
    headers = {},
    c = false,
    tos = true,
  }) => {
    try {
      const finalUrl = defaultConfig.baseURL + url;
      const finalHeaders = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...headers,
      };

      const response = await axios.get(finalUrl, {
        headers: finalHeaders,
        params, // Pass the params object here
      });

      if (c) {
        console.log(response); // Log the full response if 'c' is set
      }

      if (response.data.status === 'success') {
        tos &&
          Toast.show({
            title: response.data.messages ? response.data.messages : 'Berhasil',
            backgroundColor: colors.green,
          });

        return { data: response.data, status: response.status };
      } else {
        return handleError(
          {
            message: response.data.messages
              ? response.data.messages
              : 'Error -',
          },
          c
        );
      }
    } catch (error) {
      return handleError(error, c);
    }
  };

  return { POST, GET };
};

export default useHttpHelper;
