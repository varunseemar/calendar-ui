
import { Music, Calendar, CircleDollarSign } from 'lucide-react';

interface EventIconProps {
  type: 'music' | 'meeting' | 'sport';
  className?: string;
}

export const EventIcon = ({ type, className }: EventIconProps) => {
  switch (type) {
    case 'music':
      return <Music className={className} size={16} />;
    case 'sport':
      return <CircleDollarSign className={className} size={16} />;
    case 'meeting':
    default:
      return <Calendar className={className} size={16} />;
  }
};

export default EventIcon;
