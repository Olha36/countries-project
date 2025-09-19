import type { FavouriteIconProps } from '@/types/CountryTypes';
import { CiHeart } from 'react-icons/ci';

export default function FavouriteIcon({ isFavourite, onClick }: FavouriteIconProps) {
  return (
    <div className="large-font text-center top-20">
      <CiHeart
        className={isFavourite ? 'active-heart' : ''}
        onClick={onClick}
        style={{
          cursor: 'pointer',
          color: isFavourite ? 'red' : 'black',
          width: '50px',
          height: '50px',
        }}
        aria-label={isFavourite ? 'Remove from favorites' : 'Add to favorites'}
      />
    </div>
  );
}
