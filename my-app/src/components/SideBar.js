import React, { useState, useContext, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight, MdAdd, MdOutlineSettings } from 'react-icons/md';
import { ChatContext } from '../context/chatContext';
import logo from '../assets/logo.png';
import Modal from './Modal';
import Setting from './Setting';

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [, , clearMessages] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);

  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    handleResize();
  }, []);

  const clearChat = () => clearMessages();

  return (
    <section className={` ${open ? 'w-screen lg:w-96' : 'w-16'} sidebar bg-gray-300 text-black`}>
      <div className="sidebar__app-bar ">
        <div className="flex items-center">
          <div className={`sidebar__app-logo ${!open && 'scale-0 hidden'}`}>
            <span className="w-8 h-8">
              <img width="30" src={logo} alt="Logo" />
            </span>
          </div>
          <h1 className={`${!open && 'scale-0 hidden text-black'}`}>Med-Gen AI</h1>
        </div>
        <div className={''} onClick={() => setOpen(!open)}>
          {open ? (
            <MdChevronLeft className=" text-black sidebar__btn-icon" />
          ) : (
            <MdChevronRight className=" text-black sidebar__btn-icon" />
          )}
        </div>
      </div>
      <div className="nav">
        <span className="border nav__item border-black text-black bg-gray-300" onClick={clearChat}>
          <div className="nav__icons">
            <MdAdd className='black'/>
          </div>
          <h1 className={`${!open && 'hidden'}`}>New chat</h1>
        </span>
      </div>

    </section>
  );
};

export default SideBar;
