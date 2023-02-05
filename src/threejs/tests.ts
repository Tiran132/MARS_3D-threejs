import { create, create_model, group, rgroup, update } from "./ObjectManager";

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export const t_RoboHand = async () => {
    await sleep(3000);
    
    const detal1 = create({
        object_type: "group",
        position: [0, 0, 0]
    })

    const object_1 = create({
        // geometry: [1, 2, 1],
        scale: [0.5, 1, 0.5],
        position: [0, 0.5, 0]
    })


    const sphere_1 = create({
        object_type: "sphere",
        color: [255, 0, 0],
        geometry: [0.5, 0.5, 0.5],
        position: [0, 0, 0]
    })

    group(detal1, object_1);
    group(detal1, sphere_1);

    const detal2 = create({
        object_type: "group",
        position: [0, 0, 0]
    })

    const object_2 = create({
        // geometry: [1, 2, 1],
        scale: [0.5, 2, 0.5],
        position: [0, 1, 0]
    })


    const sphere_2 = create({
        object_type: "sphere",
        color: [255, 0, 0],
        geometry: [0.5, 0.5, 0.5],
        position: [0, 0, 0]
    })

    group(detal2, object_2);
    group(detal2, sphere_2);
    group(detal2, detal1)
    
    update(detal1, {
        position: [0, 2, 0]
    })


    const detal3 = create({
        object_type: "group",
        position: [0, 0, 0]
    })

    const object_3 = create({
        // geometry: [1, 2, 1],
        scale: [0.5, 2, 0.5],
        position: [0, 1, 0]
    })


    const sphere_3 = create({
        object_type: "sphere",
        color: [255, 0, 0],
        geometry: [0.5, 0.5, 0.5],
        position: [0, 0, 0]
    })

    group(detal3, object_3);
    group(detal3, sphere_3);
    group(detal3, detal2)

    update(detal2, {
        position: [0, 2, 0]
    })



    const detal4 = create({
        object_type: "group",
        position: [0, 0, 0]
    })

    const object_4 = create({
        // geometry: [1, 2, 1],
        scale: [2, 0.5, 2],
        position: [0, -0.25, 0]
    })

    group(detal4, object_4);
    group(detal4, detal3)

    update(detal3, {
        position: [0, 0, 0]
    })

    




    await sleep(1000);
    update(detal1, {
        rotation: [90, 0, 0]
    })

    
    await sleep(1000);
    update(detal2, {
        rotation: [40, 0, 0]
    })

    
    await sleep(1000);
    update(detal3, {
        rotation: [0, 0, 0]
    })
    
    for (let i = 0; i < 360; i++) {
        update(detal3, {
            rotation: [0, i, 0]
        })
        await sleep(10)
    }

    
    setTimeout(async () => {
        for (let i = 0; i < 5; i+=0.05) {
            update(detal4, {
                position: [i, 0, 0]
            })
            await sleep(20)
        }
        for (let i = 5; i > -5; i-=0.05) {
            update(detal4, {
                position: [i, 0, 0]
            })
            await sleep(20)
        }
        
    }, 1000)


    await sleep(1000);
    update(detal3, {
        rotation: [20, 0, 0]
    })
    
    await sleep(1000);
    update(detal3, {
        rotation: [40, 0, 0]
    })
    
    await sleep(1000);
    update(detal3, {
        rotation: [60, 0, 0]
    })
    
}



const testAsync = async () => {
    await sleep(2000)

    const sphereId = create({
        object_type: "sphere",
        position: [1, 0, 0],
        color: [50, 20, 80]
    })
    const objectId = create({
        object_type: "cube",
        position: [0, 0, 0],
        color: [10, 60, 100]
    })
    // group(objectId, sphereId);

    await sleep(2000)
    update(objectId, {
        position: [0, 1, 0]
    })
    await sleep(500)
    update(sphereId, {
        position: [-1, 0, 0]
    })
    await sleep(500)
    update(sphereId, {
        position: [0, 0, 0]
    })
    await sleep(1500)
    update(sphereId, {
        position: [0, 0, 0]
    })
    
    await sleep(1500)
    group(objectId, sphereId)
    
    update(sphereId, {
        color: [10, 60, 100]
    })

    await sleep(500);

    for (let i = 0; i < 360; i++) {
        update(objectId, {
            rotation: [i, 0, 0]
        })
        await sleep(10);
    }

    await sleep(1000);
    rgroup(objectId, sphereId)
    update(sphereId, {
        color: [50, 20, 80]
    })

    await sleep(1000)
    
    setTimeout(async () => {
        for (let i = 0; i < 360; i++) {
            update(objectId, {
                rotation: [i, 0, 0]
            })
            await sleep(10);
        }
    }, 0)

    for (let i = 0; i < 5; i+=0.1) {
        update(sphereId, {
            position: [i, 0, 0]
        })
        
        update(objectId, {
            position: [0, 1, i]
        })
        await sleep(30);
    }
    
    for (let i = 5; i > -5; i-=0.1) {
        update(sphereId, {
            position: [i, 0, 0]
        })
        
        update(objectId, {
            position: [0, 1, i]
        })
        await sleep(30);
    }
}



const mini_test = () => {

    const sphereId = create({
        object_type: "sphere",
        position: [0, 1, 0]
    })

    // console.log("created sphere:", sphereId)

    const objectId = create({
        object_type: "cube",
        position: [0, 0, 0]
    })

    // console.log("created object with id:", objectId)
    group(objectId, sphereId);

    setTimeout(() => {

        update(objectId, {
            position: [0, 1, 0]
        })

        

        setTimeout(() => {
            
            update(objectId, {
                rotation: [10, 0, 0]
            })

            setTimeout(() => {
            update(objectId, {
                rotation: [20, 0, 0]
            })
            
            setTimeout(() => {
                update(objectId, {
                    rotation: [30, 0, 0]
                })
                
            setTimeout(() => {
                update(objectId, {
                    rotation: [40, 0, 0]
                })
                
            setTimeout(() => {
                update(objectId, {
                    rotation: [50, 0, 0]
                })
                
            setTimeout(() => {
                update(objectId, {
                    rotation: [60, 0, 0]
                })
                
            setTimeout(() => {
                update(objectId, {
                    rotation: [70, 0, 0]
                })
                
            setTimeout(() => {
                update(objectId, {
                    rotation: [80, 0, 0]
                })
                
            setTimeout(() => {
                update(objectId, {
                    rotation: [90, 0, 0]
                })


                
                update(objectId, {
                    color: [127.5, 127.5, 127.5],
                })
                
                update(sphereId, {
                    color: [127.5, 127.5, 127.5],
                })

                
            }, 500);
            }, 500);
            }, 500);
            }, 500);
            }, 500);
            }, 500);
            }, 500);
            }, 500);
            update(objectId, {
                color: [10, 60, 100],
            })
            
            update(sphereId, {
                color: [10, 60, 100],
            })
        }, 2000);

    }, 5000);

}

const t_obj_hand = async () => {
    const id = await create_model("hand.obj");
    
    if (!id) return;
    
    update(id, {
        scale: [0.3, 0.3, 0.3],
        rotation: [-90, 0, 0],
        position: [0, 2.5, 0]
    })

    const cube = create({
        scale: [1, 5, 1],

    })

    const detal1 = create({
        object_type: "group"
    })

    const cylinder = create({
        object_type: "cylinder",
        rotation: [0, 0, 90],
        scale: [0.4, 2, 0.4]
    })

    group(detal1, cube)
    group(detal1, cylinder)
    group(detal1, id)

    for (let i = 0; i < 360; i+=0.1) {
        update(detal1, {
            rotation: [i, 0, 0]
        })
        await sleep(10);
    }
} 

const t_robot_alina = async () => {
    const base = await create_model("base.obj");
    const base_sharnir = await create_model("base_sharnir.obj");
    const zveno1 = await create_model("zveno1.obj");
    // update(base, {
    //     scale: [0.3, 0.3, 0.3],
    //     rotation: [-90, 0, 0],
    //     position: [0, 2.5, 0]
    // })

    if (!base || !base_sharnir || !zveno1) return;

    update(base, {
        color: [15, 15, 15]
    })
    update(base_sharnir, {
        color: [60, 60, 60],
        rotation: [0, 30, 0]
    })
    update(zveno1, {
        position: [0, 1, 0],
        color: [255, 132, 0],
        rotation: [0, 0, 30]
    })


    const zveno2 = await create_model("zveno2.obj");
    const cleshnya1 = await create_model("cleshnya1.obj");
    const cleshnya2 = await create_model("cleshnya2.obj");

    
    if (!zveno2 || !cleshnya1 || !cleshnya2) return;

    update(zveno2, {
        position: [0, 3.25, 0],
        color: [255, 132, 0],
        rotation: [0, 0, 30]
    })
    update(cleshnya1, {
        position: [0.1, 3.25, 0],
        color: [60, 60, 60],
        rotation: [0, 0, -15]
    })
    update(cleshnya2, {
        position: [-0.1, 3.25, 0],
        color: [60, 60, 60],
        rotation: [0, 0, 15]
    })


    group(base, base_sharnir)
    group(base_sharnir, zveno1)
    group(zveno1, zveno2)
    group(zveno2, cleshnya1)
    group(zveno2, cleshnya2)







    let i = 0;
    const rotation_angele = 45;

    while(true) {

        const angle = i % (rotation_angele * 2) <= rotation_angele ? i % rotation_angele 
            : (rotation_angele - i) % rotation_angele 
        
        update(base, {
            position: [angle * 0.05, 0, 0]
        })
        update(base_sharnir, {
            rotation: [0, angle * 2, 0]
        })
        update(zveno1, {
            rotation: [0, 0, angle * 0.5]
        })
        update(zveno2, {
            rotation: [0, 0, angle]
        })
        update(cleshnya1, {
            rotation: [0, 0, -angle * 0.5]
        })
        update(cleshnya2, {
            rotation: [0, 0, angle * 0.5]
        })


        await sleep(10);

        i += 0.1;
    }
}


export const init = () => {
    // create_model("models/model_with_light.json")
    // t_obj_hand()
    // t_robot_alina()
}


// Реализовать генерацию из C# с интерфейсом