pragma solidity >=0.4.22 <0.9.0;

contract DappToken{

    string public name = "Dapp ka";
    string public symbol = "ka";
    string public standard = "Dapp ka v1.0";

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
        );

    //Constructor
    //Set the total number tokens
    // Read tokens
    uint256 public totalSupply;
    // name

    mapping(address => uint256)public balanceOf;
    mapping(address => mapping(address=>uint256)) public allowance;
// allowence
    constructor(uint256 _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }
    //transfer
    function transfer(address _to,uint256 _value) public returns (bool success) {
    //    devuelve falso o verdadero
       require(balanceOf[msg.sender] >= _value);

       balanceOf[msg.sender] -= _value;
       balanceOf[_to] += _value;

       emit Transfer(msg.sender, _to, _value);
       return true;
    //    Transfer(msg.sender, _to, _value);
    } 


    // approve 

    function approve(address _spender,uint256 _value) public returns (bool success){
        
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        
        return true;
    }
// transfer from

    function transferFrom(address _from,address _to, uint256 _value) public returns (bool success) {
        // require(condition);
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value; 


        emit Transfer(_from, _to, _value);

        return true;
    }












}



