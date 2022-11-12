
export function MessageBox(props) {
  return (
    <div className="text-center">
      <div className={props.variant} role="alert">

        {props.children}
      </div>
    </div>
  );
}
