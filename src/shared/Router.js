import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FakeData from '../shared/FakeData.json'
import Home from '../pages/Home'
import Faker from '../pages/Faker'
import Guma from '../pages/Guma'
import Keria from '../pages/Keria'
import Oner from '../pages/Oner'
import Zeus from '../pages/Zeus'
import Loginpage from '../pages/Loginpage'
import Membershippage from '../pages/Membershippage'
import Layout from '../components/Layout'
import { CaptainContext } from '../components/captaincontext'
import { useSelector } from 'react-redux'

function Router() {
  // const [Letter, setLetter] = useState(FakeData)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <BrowserRouter>
      <CaptainContext.Provider>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/Membership" element={<Membershippage />} />
          {isLoggedIn ? (
            <Route
              path="/*"
              element={
                <>
                  <Layout />
                  <Routes>
                    <Route path="Home" element={<Home />} />
                    <Route path="Zeus/:id" element={<Zeus />} />
                    <Route path="Oner/:id" element={<Oner />} />
                    <Route path="Faker/:id" element={<Faker />} />
                    <Route path="Guma/:id" element={<Guma />} />
                    <Route path="Keria/:id" element={<Keria />} />
                  </Routes>
                </>
              }
            />
          ) : (
            <Route
              path="/*"
              element={
                <>
                  <Routes>
                    <Route path="Home" element={<Home />} />
                    <Route path="Zeus/:id" element={<Zeus />} />
                    <Route path="Oner/:id" element={<Oner />} />
                    <Route path="Faker/:id" element={<Faker />} />
                    <Route path="Guma/:id" element={<Guma />} />
                    <Route path="Keria/:id" element={<Keria />} />
                  </Routes>
                </>
              }
            />
          )}
        </Routes>
      </CaptainContext.Provider>
    </BrowserRouter>
  )
}

export default Router
