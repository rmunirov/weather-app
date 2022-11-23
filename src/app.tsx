import React, { Suspense } from 'react';
import { Layout } from './components';
import MainPage from './pages/main/main';
import { Provider } from 'react-redux';
import store from './__data__/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                <Suspense fallback="Loading...">
                    <Layout>
                        <MainPage />
                    </Layout>
                </Suspense>
            </PersistGate>
        </Provider>
    );
};

export default App;
