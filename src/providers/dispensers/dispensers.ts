import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DispensersProvider {

  constructor(public http: HttpClient) {

  }

  getDispensers(){
    return [{
      "dispenserId": "D1",
      "probability": 20,
      "kits": [{
          "kitId": "K1",
          "probability": 50
        },
        {
          "kitId": "K2",
          "probability": 75
        },
        {
          "kitId": "K3",
          "probability": 90
        },
        {
          "kitId": "K4",
          "probability": 100
        }
      ],
      "users": [{
          "userId": "U1",
          "probability": 10
        },
        {
          "userId": "U2",
          "probability": 25
        },
        {
          "userId": "U3",
          "probability": 69
        },
        {
          "userId": "U4",
          "probability": 99
        },
        {
          "userId": "U5",
          "probability": 100
        }
      ]
    },
    {
      "dispenserId": "D2",
      "probability": 50,
      "kits": [{
          "kitId": "K1",
          "probability": 50
        },
        {
          "kitId": "K2",
          "probability": 75
        },
        {
          "kitId": "K3",
          "probability": 90
        },
        {
          "kitId": "K4",
          "probability": 100
        }
      ],
      "users": [{
          "userId": "U1",
          "probability": 10
        },
        {
          "userId": "U2",
          "probability": 25
        },
        {
          "userId": "U3",
          "probability": 80
        },
        {
          "userId": "U4",
          "probability": 99
        },
        {
          "userId": "U4",
          "probability": 100
        }
      ]
    },
    {
      "dispenserId": "D3",
      "probability": 60,
      "kits": [{
          "kitId": "K1",
          "probability": 50
        },
        {
          "kitId": "K2",
          "probability": 75
        },
        {
          "kitId": "K3",
          "probability": 90
        },
        {
          "kitId": "K4",
          "probability": 100
        }
      ],
      "users": [{
          "userId": "U1",
          "probability": 10
        },
        {
          "userId": "U2",
          "probability": 25
        },
        {
          "userId": "U3",
          "probability": 80
        },
        {
          "userId": "U4",
          "probability": 99
        },
        {
          "userId": "U4",
          "probability": 100
        }
      ]
    },
    {
      "dispenserId": "D4",
      "probability": 100,
      "kits": [{
          "kitId": "K1",
          "probability": 50
        },
        {
          "kitId": "K2",
          "probability": 75
        },
        {
          "kitId": "K3",
          "probability": 90
        },
        {
          "kitId": "K4",
          "probability": 100
        }
      ],
      "users": [{
          "userId": "U1",
          "probability": 10
        },
        {
          "userId": "U2",
          "probability": 25
        },
        {
          "userId": "U3",
          "probability": 80
        },
        {
          "userId": "U4",
          "probability": 99
        },
        {
          "userId": "U4",
          "probability": 100
        }
      ]
    }
  ];
  
  }
}
