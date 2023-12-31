import { transferObjectKeyToLabel } from '../../../util';
import { approved, waiting } from '../../../assets';

export const toPaymentTableMapper = (res) => {
  const columnList = [
    {
      name: 'Id',
      sort: {
        name: 'id',
        value: '',
      },
    },
    {
      name: 'Cost',
      sort: {
        name: 'cost',
        value: '',
      },
    },
    {
      name: 'Created at',
      sort: {
        name: 'created_at',
        value: '',
      },
    },
    {
      name: 'Status',
    },
    {
      name: 'Code',
    },
    {
      name: 'Charge',
    },
  ];

  const rowList = res.map((payment) => {
    const { id, cost, status, token, charge, created_at } = payment;
    const createdDate = new Date(created_at).toISOString().split('T')?.at(0);
    const createdHour = new Date(created_at).getHours();
    const createdMinute = new Date(created_at).getMinutes();
    return [
      { name: 'Id', value: id },
      { name: 'Cost', value: `${cost} $` },
      {
        name: 'Status',
        value: transferObjectKeyToLabel(status),
        icon: payment.status?.toLowerCase().includes('approved') ? approved : waiting,
      },
      { name: 'Code', value: token ?? '-' },
      { name: 'Charge', value: charge ?? '-' },
      { name: 'Created at', value: `${createdDate} ${createdHour}:${createdMinute}` },
    ];
  });

  return { columnList, rowList };
};
