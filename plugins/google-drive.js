import {
  apiKey,
  clientId,
  discoveryDocs,
  scope
} from '@/plugins/google-config.js';

export default async ({ store }) => {
  const updateState = async isSignedIn => {
    store.commit('user/SET_IS_SIGNED_IN', isSignedIn);

    if (isSignedIn) {
      try {
        const response = await gapi.client.drive.files.list({
          pageSize: 1,
          q:
            "name='apuntus.com' and mimeType='application/vnd.google-apps.folder'"
        });

        if (response.result.files.length) {
          store.commit('user/SET_BASE_FOLDER', response.result.files[0]);
          console.log('Ya estaba creado');
        } else {
          const baseFolder = await gapi.client.drive.files.create({
            name: 'apuntus.com',
            mimeType: 'application/vnd.google-apps.folder'
          });
          console.log('Se creo');
          store.commit('user/SET_BASE_FOLDER', baseFolder.result);
        }
      } catch (error) {
        console.log(error.result.error.errors);
      }
    }
  };

  gapi.load('client:auth2', async () => {
    try {
      await gapi.client.init({
        apiKey,
        clientId,
        discoveryDocs,
        scope
      });

      updateState(gapi.auth2.getAuthInstance().isSignedIn.get());
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateState);
    } catch (error) {
      console.log('error', error);
    }
  });
};
