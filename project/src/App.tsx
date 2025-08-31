import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EquipmentManagement from './components/EquipmentManagement';
import PurchaseManagement from './components/PurchaseManagement';
import TicketManagement from './components/TicketManagement';
import Settings from './components/Settings';
import { Equipment, Purchase, Ticket } from './types';
import { mockEquipments, hospitalInfo, mockPurchases, mockTickets } from './data/mockData';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [equipments, setEquipments] = useState<Equipment[]>(mockEquipments);
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  const handleAddEquipment = (equipment: Equipment) => {
    setEquipments(prev => [...prev, equipment]);
  };

  const handleUpdateEquipment = (updatedEquipment: Equipment) => {
    setEquipments(prev =>
      prev.map(eq => eq.id === updatedEquipment.id ? updatedEquipment : eq)
    );
  };

  const handleDeleteEquipment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      setEquipments(prev => prev.filter(eq => eq.id !== id));
    }
  };

  const handleAddPurchase = (purchase: Purchase) => {
    setPurchases(prev => [...prev, purchase]);
  };

  const handleAddTicket = (ticket: Ticket) => {
    setTickets(prev => [...prev, ticket]);
  };

  const handleUpdateTicket = (updatedTicket: Ticket) => {
    setTickets(prev =>
      prev.map(ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket)
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Dashboard hospital={hospitalInfo} equipments={equipments} />;
      case 'equipment':
        return (
          <EquipmentManagement
            equipments={equipments}
            onAddEquipment={handleAddEquipment}
            onUpdateEquipment={handleUpdateEquipment}
            onDeleteEquipment={handleDeleteEquipment}
          />
        );
      case 'purchases':
        return (
          <PurchaseManagement
            purchases={purchases}
            onAddPurchase={handleAddPurchase}
          />
        );
      case 'tickets':
        return (
          <TicketManagement
            tickets={tickets}
            equipments={equipments}
            onAddTicket={handleAddTicket}
            onUpdateTicket={handleUpdateTicket}
          />
        );
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard hospital={hospitalInfo} equipments={equipments} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;