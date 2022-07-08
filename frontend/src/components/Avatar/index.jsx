import PropTypes from 'prop-types'

Avatar.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.any,
}

Avatar.defaultProps = {
  alt: '',
  src: '',
  size: '2rem',
}

function Avatar(props) {
  const { alt, src, size } = props

  return (
    <div>
      <img
        alt={alt}
        src={src}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          borderRadius: '50%',
          overflow: 'hidden',
          padding: 1,
          border: '1px solid #dcdcdc',
          cursor: 'pointer',
          backgroundColor: '#ffffff',
        }}
      />
    </div>
  )
}

export default Avatar
