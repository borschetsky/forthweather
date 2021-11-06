import './Error.scss';

const Error  = ( {message = 'Some error occured!'} ) => {
return <div className="error">
  {message}
</div>
}

export default Error;