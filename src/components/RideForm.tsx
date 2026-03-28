import { useState } from 'react';
import { Ride } from '../types';
import { X, MapPin, Calendar, Clock, Users, CircleDollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface RideFormProps {
  onClose: () => void;
  onSubmit: (ride: Omit<Ride, 'id' | 'createdAt' | 'user'>) => void;
}

export default function RideForm({ onClose, onSubmit }: RideFormProps) {
  const [formData, setFormData] = useState({
    type: 'driver' as 'driver' | 'passenger',
    from: '',
    to: '',
    date: '',
    time: '',
    seats: 1,
    price: 0,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={onClose} className="p-2 -ml-2">
          <X size={24} />
        </button>
        <h2 className="text-lg font-semibold">发布行程</h2>
        <div className="w-10" />
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: 'driver' })}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              formData.type === 'driver' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
            }`}
          >
            我是车主
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: 'passenger' })}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              formData.type === 'passenger' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'
            }`}
          >
            我是乘客
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <MapPin className="text-green-500" size={20} />
            <input
              required
              placeholder="出发地"
              className="bg-transparent flex-1 outline-none text-sm"
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <MapPin className="text-orange-500" size={20} />
            <input
              required
              placeholder="目的地"
              className="bg-transparent flex-1 outline-none text-sm"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <Calendar className="text-gray-400" size={20} />
            <input
              required
              type="date"
              className="bg-transparent flex-1 outline-none text-sm"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <Clock className="text-gray-400" size={20} />
            <input
              required
              type="time"
              className="bg-transparent flex-1 outline-none text-sm"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <Users className="text-gray-400" size={20} />
            <input
              required
              type="number"
              min="1"
              placeholder="人数/座位"
              className="bg-transparent flex-1 outline-none text-sm"
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
            />
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <CircleDollarSign className="text-gray-400" size={20} />
            <input
              required
              type="number"
              min="0"
              placeholder="费用/人"
              className="bg-transparent flex-1 outline-none text-sm"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-gray-400 px-1">备注信息</label>
          <textarea
            placeholder="如：不抽烟、有大件行李等..."
            className="w-full p-3 bg-gray-50 rounded-xl outline-none text-sm min-h-[100px]"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
        >
          立即发布
        </button>
      </form>
    </motion.div>
  );
}
