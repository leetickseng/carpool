import { Ride } from '../types';
import { MapPin, Calendar, Clock, Users, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface RideCardProps {
  ride: Ride;
  onClick: (ride: Ride) => void;
}

export default function RideCard({ ride, onClick }: RideCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(ride)}
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <img
            src={ride.user.avatar}
            alt={ride.user.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="font-semibold text-sm">{ride.user.name}</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              ride.type === 'driver' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
            }`}>
              {ride.type === 'driver' ? '车主' : '乘客'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-orange-500 font-bold text-lg">¥{ride.price}</span>
          <p className="text-gray-400 text-[10px]">/人</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="flex flex-col items-center mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <div className="w-0.5 h-6 bg-gray-100 my-1" />
            <div className="w-2 h-2 rounded-full bg-orange-500" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{ride.from}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{ride.to}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50 text-gray-500 text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{ride.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{ride.time}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={14} />
            <span>余{ride.seats}位</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
