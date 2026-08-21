interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
}

export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  name,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      name={name}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium text-base transition-colors duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />
  );
}
