import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { React, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Body from './Components/Body.jsx';
import NotFound from './Components/NotFound.jsx';
import './index.css';
import loadingGif from './Images/loading.gif';

//component with lazy loading
const SearchComponent = lazy(() => import('./Components/SearchComponent.jsx'));
const FilterTabPage = lazy(() => import('./Components/FilterTabPage.jsx'));
const ChannelPage = lazy(() => import('./Components/ChannelPage.jsx'));
const VideoPlayer = lazy(() => import('./Components/videoPlayer.jsx'));
const CreateChannel = lazy(() => import('./Components/CreateChannel.jsx'));
const LoginResister = lazy(() => import('./Components/Login-Register.jsx'));
const UserAccount = lazy(() => import('./Components/UserAccount.jsx'));

const appRouter = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Body />
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={
            <div className='min-h-screen'> <img className="lg:w-10 mx-auto my-auto "src={loadingGif} alt="loading" /></div>
          }>
            <LoginResister />
          </Suspense>
        )
      },
      {
        path: "/account",
        element: (
          <Suspense fallback={
            <div className='min-h-screen'> <img className="lg:w-10 mx-auto my-auto "src={loadingGif} alt="loading" /></div>
          }>
            <UserAccount />
          </Suspense>
        )
      },
      {
        path: "/channel/create",
        element: (
          <Suspense fallback={
            <div className='min-h-screen'> <img className="lg:w-10 mx-auto my-auto "src={loadingGif} alt="loading" /></div>
          }>
            <CreateChannel />
          </Suspense>
        )
        
      },
      {
        path: "/channel/:id",
        element: (
          <Suspense fallback={
            <div className='min-h-screen'> <img className="lg:w-10 mx-auto my-auto "src={loadingGif} alt="loading" /></div>
          }>
            <ChannelPage />
          </Suspense>
        )
      },
      {
        path: "/filter/:id",
        element: (
          <Suspense fallback={
            <div className='min-h-screen'> <img className="lg:w-10 mx-auto my-auto "src={loadingGif} alt="loading" /></div>
          }>
            <FilterTabPage />
          </Suspense>
        )
      },
      {
        path: "/videoPlayer/:videoId",
        element: (
          <Suspense fallback={
            <div className='min-h-screen'> <img className="lg:w-10 mx-auto my-auto "src={loadingGif} alt="loading" /></div>
          }>
           <VideoPlayer />
          </Suspense>
        )
      },
      {
        path: "/search/:input",
        element: (
          <Suspense fallback={
            <div className='min-h-screen'> <img className="lg:w-10 mx-auto my-auto "src={loadingGif} alt="loading" /></div>
          }>
             <SearchComponent />
          </Suspense>
        )
      },
    ],
    errorElement: <NotFound />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
