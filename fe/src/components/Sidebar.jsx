import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Sidebar({ setSelectedComponent }) {
  return (
    <div className="bg-gray-100 min-h-screen h-full p-4 flex flex-col justify-between w-60">
      <div>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setSelectedComponent('products')}
              className="block px-4 py-2 rounded hover:bg-gray-200 w-full text-left"
            >
              Produk Saya
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedComponent('addProduct')}
              className="block px-4 py-2 rounded hover:bg-gray-200 w-full text-left"
            >
              Tambah Produk
            </button>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">
              Pengaturan
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="space-y-2">
          <li>
            <Link to='/' className="block px-4 py-2 rounded hover:bg-gray-200">
              <FontAwesomeIcon icon={faHouse} /> Main Page
            </Link>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 rounded hover:bg-gray-200">
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar