import React, { useState, useEffect, useRef } from 'react';
import { Transition, ActionIcon, Menu, Divider, Button } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { FiMenu } from 'react-icons/fi';
import ModalActionEditSlice, { setParentId, openModal, openedSelector } from '../ModalActionAdd/ModalActionAddSlice';
import { useDispatch, useSelector} from 'react-redux'

function MenuIcon() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // State to control menu visibility
  const [scroll, scrollTo] = useWindowScroll();
  const iconRef = useRef();
  const dispatch = useDispatch()
  const addModalOpened = useSelector(store => store.ui.modals.actionAdd.opened)
  const editModalOpened = useSelector(store => store.ui.modals.actionEdit.opened)

  useEffect(() => {
    let timer;

    setIsScrolling(true);
    clearTimeout(timer);
    timer = setTimeout(() => setIsScrolling(false), 200);
    
    return () => {
      clearTimeout(timer);
    };
  }, [scroll]);
  
  const handleNewActionClick = () => {
    dispatch(setParentId({ value: '' }))
    dispatch(openModal({}))
  }

  return (
              <Transition
        mounted={!isScrolling}
        transition="translateY 1500ms ease-in-out"
      >
        {(transitionStyles) => (
          <div style={{
            ...transitionStyles,
            position: 'fixed',
            bottom: 0,
            width: '100%',
            display: "flex",
            justifyContent: "center",
            paddingBottom: "2rem",
            transform: `translateY(${isScrolling || addModalOpened || editModalOpened ? '100%' : '0'})`,
            zIndex: 999
          }}>
            
    <Menu zIndex={1000} width={"50%"} position={"top"}>
      <Menu.Target>

              <ActionIcon 
                style={
                  {
                    boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, .25)"
                  }
                }
                color="green"size="3rem" radius="xl" variant="filled">
                <FiMenu size="1.5rem"/>
              </ActionIcon>
       
      </Menu.Target>
      <Menu.Dropdown>
      <Menu.Label>Create...</Menu.Label>
      <Menu.Item onClick={handleNewActionClick}>New Action</Menu.Item>
      <Divider/>
      <Menu.Label>Misc.</Menu.Label>
      <Menu.Item disabled>Settings</Menu.Item>
      </Menu.Dropdown>
      </Menu>
   </div>
        )}
      </Transition>
  );
}

export default MenuIcon;