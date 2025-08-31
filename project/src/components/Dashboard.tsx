import React from 'react';
import { Equipment, Hospital } from '../types';
import { Package, AlertTriangle, CheckCircle, Wrench, TrendingUp, IndianRupee } from 'lucide-react';

interface DashboardProps {
  hospital: Hospital;
  equipments: Equipment[];
}

const Dashboard: React.FC<DashboardProps> = ({ hospital, equipments }) => {
  const totalEquipments = equipments.length;
  const activeEquipments = equipments.filter(eq => eq.status === 'Active').length;
  const maintenanceEquipments = equipments.filter(eq => eq.status === 'Maintenance').length;
  const outOfOrderEquipments = equipments.filter(eq => eq.status === 'Out of Order').length;
  const totalValue = equipments.reduce((sum, eq) => sum + eq.cost, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Equipment',
      value: totalEquipments,
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Equipment',
      value: activeEquipments,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Under Maintenance',
      value: maintenanceEquipments,
      icon: Wrench,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Out of Order',
      value: outOfOrderEquipments,
      icon: AlertTriangle,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  const recentEquipments = equipments
    .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
    .slice(0, 5);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Dashboard</h1>
          <p className="text-gray-600">Welcome to the Neotia Hospital Inventory Management System</p>
        </div>

        {/* Hospital Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{hospital.name}</h2>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Address:</span> {hospital.address}</p>
                <p><span className="font-medium">Phone:</span> {hospital.phone}</p>
                <p><span className="font-medium">Email:</span> {hospital.email}</p>
                <p><span className="font-medium">Website:</span> {hospital.website}</p>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <IndianRupee className="w-8 h-8 text-blue-600" />
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Asset Value</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalValue)}</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Equipment */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Equipment</h3>
            <div className="space-y-4">
              {recentEquipments.map((equipment) => (
                <div key={equipment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{equipment.name}</p>
                    <p className="text-sm text-gray-600">{equipment.category} • {equipment.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      equipment.status === 'Active' ? 'bg-green-100 text-green-700' :
                      equipment.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-700' :
                      equipment.status === 'Out of Order' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {equipment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Hospital Departments</h3>
            <div className="grid grid-cols-2 gap-3">
              {hospital.departments.map((department, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm font-medium text-blue-800">{department}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;