import { useState, useEffect } from 'react';
import { Ride } from './types';
import RideCard from './components/RideCard';
import RideForm from './components/RideForm';
import { Search, Plus, MapPin, Phone, MessageCircle, ChevronLeft, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_RIDES: Ride[] = [
  {
    id: '1',
    type: 'driver',
    from: '杭州市 西湖区',
    to: '上海市 浦东新区',
    date: '2026-03-29',
    time: '09:00',
    seats: 3,
    price: 80,
    user: {
      name: '张师傅',
      avatar: 'https://picsum.photos/seed/driver1/100/100',
      phone: '13800138000'
    },
    description: '准时出发，不绕路，车内整洁。',
    createdAt: Date.now()
  },
  {
    id: '2',
    type: 'passenger',
    from: '杭州东站',
    to: '萧山机场',
    date: '2026-03-29',
    time: '14:30',
    seats: 1,
    price: 35,
    user: {
      name: '小李',
      avatar: 'https://picsum.photos/seed/user2/100/100',
      phone: '13900139000'
    },
    description: '有一个小行李箱。',
    createdAt: Date.now() - 3600000
  },
  {
    id: '3',
    type: 'driver',
    from: '嘉兴市 南湖区',
    to: '苏州市 姑苏区',
    date: '2026-03-30',
    time: '08:00',
    seats: 2,
    price: 50,
    user: {
      name: '王女士',
      avatar: 'https://picsum.photos/seed/driver3/100/100',
      phone: '13700137000'
    },
    description: '顺路带人，希望乘客安静。',
    createdAt: Date.now() - 7200000
  }
];

export default function App() {
  const [rides, setRides] = useState<Ride[]>(MOCK_RIDES);
  const [showForm, setShowForm] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [filter, setFilter] = useState<'all' | 'driver' | 'passenger'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRides = rides.filter(ride => {
    const matchesFilter = filter === 'all' || ride.type === filter;
    const matchesSearch = ride.from.includes(searchQuery) || ride.to.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const handleAddRide = (newRideData: Omit<Ride, 'id' | 'createdAt' | 'user'>) => {
    const newRide: Ride = {
      ...newRideData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      user: {
        name: '我',
        avatar: 'https://picsum.photos/seed/me/100/100',
        phone: '18888888888'
      }
    };
    setRides([newRide, ...rides]);
    setShowForm(false);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="bg-white px-4 pt-6 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-blue-600">拼车小助手</h1>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <User size={24} />
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索出发地或目的地..."
            className="w-full bg-gray-100 py-3 pl-10 pr-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          {(['all', 'driver', 'passenger'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {t === 'all' ? '全部' : t === 'driver' ? '找车主' : '找乘客'}
            </button>
          ))}
        </div>
      </header>

      {/* List */}
      <main className="flex-1 px-4 py-4 overflow-y-auto pb-24">
        {filteredRides.length > 0 ? (
          filteredRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} onClick={setSelectedRide} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search size={48} className="mb-4 opacity-20" />
            <p>暂无相关行程</p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-200 flex items-center justify-center active:scale-90 transition-transform z-20"
      >
        <Plus size={32} />
      </button>

      {/* Ride Details Modal */}
      <AnimatePresence>
        {selectedRide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end"
            onClick={() => setSelectedRide(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-white rounded-t-3xl p-6 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedRide.user.avatar}
                    alt={selectedRide.user.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-50"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{selectedRide.user.name}</h2>
                    <p className="text-gray-400 text-sm">发布于 {new Date(selectedRide.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-orange-500">¥{selectedRide.price}</span>
                  <p className="text-gray-400 text-xs">/人</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <p className="text-xs text-gray-400">出发地</p>
                    <p className="font-semibold">{selectedRide.from}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 border-t border-gray-100 pt-4">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                  <div>
                    <p className="text-xs text-gray-400">目的地</p>
                    <p className="font-semibold">{selectedRide.to}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <p className="text-[10px] text-blue-400 uppercase font-bold">出发时间</p>
                  <p className="font-semibold text-blue-700">{selectedRide.date} {selectedRide.time}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-xl">
                  <p className="text-[10px] text-green-400 uppercase font-bold">剩余座位</p>
                  <p className="font-semibold text-green-700">{selectedRide.seats}位</p>
                </div>
              </div>

              {selectedRide.description && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">行程备注</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedRide.description}</p>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold flex items-center justify-center space-x-2">
                  <MessageCircle size={20} />
                  <span>在线咨询</span>
                </button>
                <a
                  href={`tel:${selectedRide.user.phone}`}
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-blue-200"
                >
                  <Phone size={20} />
                  <span>拨打电话</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <RideForm
            onClose={() => setShowForm(false)}
            onSubmit={handleAddRide}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
