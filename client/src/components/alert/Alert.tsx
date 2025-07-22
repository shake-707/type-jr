export type AlertProp = {
  alertType: 'success' | 'error';
  message: string;
};

export const Alert = ({alertType, message}: AlertProp) => {
  let alertHeaderClass = '';
  let alertMessageClass = '';

  if (alertType === 'success') {
    alertHeaderClass += 'bg-blue-500 text-white font-bold rounded-t px-4 py-2';
    alertMessageClass +=
      'border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700';
  } else if (alertType === 'error') {
    alertHeaderClass += 'bg-red-500 text-white font-bold rounded-t px-4 py-2';
    alertMessageClass +=
      'border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700';
  }

  return (
    <div role="alert" className="w-[300px] h-[90px] mx-auto">
      <div className={alertHeaderClass}>{alertType}</div>
      <div className={alertMessageClass}>{message}</div>
    </div>
  );
};
