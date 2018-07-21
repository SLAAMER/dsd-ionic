import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DispensersProvider {

  constructor(public http: HttpClient) {

  }

  getDispensers(){
    return [{
      "dispenserId": "D1",
      "priority": 20,
      "kits": [{
          "kitId": "K1",
          "priority": 50
        },
        {
          "kitId": "K2",
          "priority": 75
        },
        {
          "kitId": "K3",
          "priority": 90
        },
        {
          "kitId": "K4",
          "priority": 100
        }
      ],
      "users": [{
          "userId": "U1",
          "priority": 10
        },
        {
          "userId": "U2",
          "priority": 25
        },
        {
          "userId": "U3",
          "priority": 69
        },
        {
          "userId": "U4",
          "priority": 99
        },
        {
          "userId": "U5",
          "priority": 100
        }
      ]
    },
    {
      "dispenserId": "D2",
      "priority": 50,
      "kits": [{
          "kitId": "K1",
          "priority": 50
        },
        {
          "kitId": "K2",
          "priority": 75
        },
        {
          "kitId": "K3",
          "priority": 90
        },
        {
          "kitId": "K4",
          "priority": 100
        }
      ],
      "users": [{
          "userId": "U1",
          "priority": 10
        },
        {
          "userId": "U2",
          "priority": 25
        },
        {
          "userId": "U3",
          "priority": 80
        },
        {
          "userId": "U4",
          "priority": 99
        },
        {
          "userId": "U4",
          "priority": 100
        }
      ]
    },
    {
      "dispenserId": "D3",
      "priority": 60,
      "kits": [{
          "kitId": "K1",
          "priority": 50
        },
        {
          "kitId": "K2",
          "priority": 75
        },
        {
          "kitId": "K3",
          "priority": 90
        },
        {
          "kitId": "K4",
          "priority": 100
        }
      ],
      "users": [{
          "userId": "U1",
          "priority": 10
        },
        {
          "userId": "U2",
          "priority": 25
        },
        {
          "userId": "U3",
          "priority": 80
        },
        {
          "userId": "U4",
          "priority": 99
        },
        {
          "userId": "U4",
          "priority": 100
        }
      ]
    },
    {
      "dispenserId": "D4",
      "priority": 100,
      "kits": [{
          "kitId": "K1",
          "priority": 50
        },
        {
          "kitId": "K2",
          "priority": 75
        },
        {
          "kitId": "K3",
          "priority": 90
        },
        {
          "kitId": "K4",
          "priority": 100
        }
      ],
      "users": [{
          "userId": "U1",
          "priority": 10
        },
        {
          "userId": "U2",
          "priority": 25
        },
        {
          "userId": "U3",
          "priority": 80
        },
        {
          "userId": "U4",
          "priority": 99
        },
        {
          "userId": "U4",
          "priority": 100
        }
      ]
    }
  ];
  
  }
}
