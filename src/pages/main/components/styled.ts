import styled from 'styled-components';
export const Container = styled.div({
    display: 'flex',
    flexDirection: 'column'
})
export const Header = styled.h2({
    display: 'flex',
    color: '#fff',
    padding: '16px 8px',
    backgroundColor: '#333',
});

export const ListWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    backgroundColor: '#333',
    padding: '16px 8px',
    overflow: 'auto',
    height: '200px'
});

export const UserWrapper = styled.div({
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: '8px 0',
    padding: '16px',
    borderRadius: '5px',
});

export const Info = styled.div({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
});

export const Email = styled.div({
    color: '#333',
    display: 'flex',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 0',
});

export const Phone = styled.div({
    color: '#333',
    fontSize: 21,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const Form = styled.form({
    marginBottom: '30px'
})

export const Error = styled.div({
    color: 'red',
    marginTop: '5px'
})