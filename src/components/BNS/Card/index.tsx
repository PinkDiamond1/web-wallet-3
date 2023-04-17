import Button from '@/components/Button';
import { shortenAddress } from '@/utils';
import { useMemo, useState } from 'react';
import BNSTransferModal from '../TransferModal';
import { StyledBNSCard } from './BNSCard.styled';
import { useCurrentUser } from '@/state/user/hooks';

type Props = {
  item: {
    name: string;
    owner: string;
    id: number;
  };
};

const BNSCard = ({ item }: Props) => {
  // const user = useSelector(getUserSelector);
  const user = useCurrentUser();
  const [showModal, setShowModal] = useState(false);

  const isAllowTransfer = useMemo(() => item.owner === user?.walletAddress, [item.owner, user?.walletAddress]);

  return (
    <>
      <StyledBNSCard className="card">
        <div className="card-content">
          <div className="card-info">
            <p className="card-title">{item.name}</p>
            <p className="card-subTitle">{shortenAddress(item.owner, 4)}</p>
            <p className="card-subTitle">Name #{item.id}</p>
            {isAllowTransfer && (
              <Button bg="white" className="transfer-btn" onClick={() => setShowModal(true)}>
                Transfer
              </Button>
            )}
          </div>
        </div>
      </StyledBNSCard>
      <BNSTransferModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default BNSCard;
