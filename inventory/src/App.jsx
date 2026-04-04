import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/admin" element={<AdminInventory />} />

            <Route path="/admin/create" element={<AdminInventoryCreate />} />

            <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />

            <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />

            <Route path="/" element={<Navigate to="/admin" replace />} />

            <Route path="*" element={
              <div className="text-center py-10">
                <h1 className="text-3xl font-bold text-red-500">404</h1>
                <p>Сторінку не знайдено</p>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;