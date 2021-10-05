const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_login",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_drive_number",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_srok",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			}
		],
		"name": "drive_add",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idCar",
				"type": "uint256"
			}
		],
		"name": "endRent",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_login",
				"type": "string"
			}
		],
		"name": "getAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "adr",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCars",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "model",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "mileage",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isRent",
						"type": "bool"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idCar",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "startTrip",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "endTrip",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "isTrip",
								"type": "bool"
							}
						],
						"internalType": "struct CarShering.Trip",
						"name": "trip",
						"type": "tuple"
					}
				],
				"internalType": "struct CarShering.Car[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "login",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "role",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "drive_number",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "srok",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "category",
								"type": "string"
							}
						],
						"internalType": "struct CarShering.License",
						"name": "license",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idCar",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "startTrip",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "endTrip",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "isTrip",
								"type": "bool"
							}
						],
						"internalType": "struct CarShering.Trip",
						"name": "trip",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "idCar",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "startTrip",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "endTrip",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "isTrip",
								"type": "bool"
							}
						],
						"internalType": "struct CarShering.Trip[]",
						"name": "trips",
						"type": "tuple[]"
					}
				],
				"internalType": "struct CarShering.User",
				"name": "user",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_idCar",
				"type": "uint256"
			}
		],
		"name": "rentCar",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

export default abi;