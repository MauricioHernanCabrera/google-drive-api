export default async ({ store }) => {
  const updateState = async isSignedIn => {
    store.commit('user/SET_IS_SIGNED_IN', isSignedIn);

    if (isSignedIn) {
      try {
        const response = await gapi.client.drive.files.list({
          pageSize: 1,
          q:
            "name='apuntus-tus-apuntes-no-eliminar' and mimeType='application/vnd.google-apps.folder'"
        });

        if (response.result.files.length) {
          console.log(response.result.files);
          store.commit('user/SET_BASE_FOLDER', response.result.files[0]);
          console.log('Ya estaba creado');
        } else {
          const baseFolder = await gapi.client.drive.files.create({
            name: 'apuntus-tus-apuntes-no-eliminar',
            mimeType: 'application/vnd.google-apps.folder'
          });
          console.log('Se creo');
          store.commit('user/SET_BASE_FOLDER', baseFolder.result);
        }
      } catch (error) {
        // console.log(error);
        console.log(error.result.error.errors);
      }
    }
  };

  gapi.load('client:auth2', async () => {
    try {
      const clientId =
        '1075043922086-3gllkkprcfkdudmlqnvea885dsmm3ckn.apps.googleusercontent.com';
      const apiKey = 'AIzaSyDsINDMWyuImmqhLRQNzbbcXPC95cFfZg4';
      const discoveryDocs = [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
      ];
      const scope = 'https://www.googleapis.com/auth/drive';

      await gapi.client.init({
        apiKey,
        clientId,
        discoveryDocs,
        scope
      });

      updateState(gapi.auth2.getAuthInstance().isSignedIn.get());
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateState);
    } catch (error) {
      console.log(error);
    }
  });
};
