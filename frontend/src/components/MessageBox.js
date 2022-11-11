export default function MessageBox(props) {
  return (
    <div className="container">
      <div
        class="alert alert-danger"
        role="alert"
        variant={props.variant || 'info'}
      >
        {props.children}
      </div>
    </div>
  );
}
