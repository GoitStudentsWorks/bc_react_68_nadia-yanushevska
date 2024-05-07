import { Navigate, Route, Routes } from 'react-router-dom';
import { refreshThunk } from './redux/Auth/operations';
import { useDispatch } from 'react-redux';
import { lazy, useEffect } from 'react';

import useMedia from './hooks/useMedia';
import './App.css';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

// import Home from './components/Home/Home';
// import Statistics from './components/Statistics/Statistics';
// import Balance from './components/Balance/Balance';
// import Currency from './components/Currency/Currency';

const Home = lazy(() => import('./components/Home/Home'));
const Statistics = lazy(() => import('./components/Statistics/Statistics'));
const Balance = lazy(() => import('./components/Balance/Balance'));
const Currency = lazy(() => import('./components/Currency/Currency'));

function App() {
    const dispatch = useDispatch();
    const summary = useSelector(selectSummary);
    useEffect(() => {
        dispatch(refreshThunk());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTransactionsSummaryByPeriod());
    }, [dispatch]);
    console.log(summary);

    const { isMobile } = useMedia();

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                >
                    <Route
                        index
                        element={
                            isMobile ? (
                                <>
                                    <Balance />
                                    <Home />
                                </>
                            ) : (
                                <Home />
                            )
                        }
                    />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="currency" element={isMobile ? <Currency /> : <Navigate to="/" />} />
                </Route>
                <Route
                    path="login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="register"
                    element={
                        <PublicRoute>
                            <RegistrationPage />
                        </PublicRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" />}></Route>
            </Routes>
        </>
    );
}

export default App;
