
var rand_char = '$#?!+\\/=0z▲▼⍌µᛉᛗᛒᛁᛖ';
var error = false;

function setErr(){
    error = Math.floor(Math.random() * (100 + 1) + 1) > 50;
    var body = document.getElementsByTagName('body');
    body[0].setAttribute('class', error ? 'error' : '');
}
setErr();


function remToPx(num_rems){
    var div = document.getElementById('rem');
    div.style.width = num_rems + 'rem';
    return div.offsetWidth;
}

var buddy_arr = {};
var undead = Math.floor(Math.random() * (100 + 1) + 1) > 50;
var bounce = 0;
var max_bounce = 3;

var bounce_left = {
    loop: false,
    order: [
        ['bounce_left', '2x', 50],
        //  ['stand', 10, 500],
    ],
    done: function(){
        setErr();
        if(undead){
            undead = false;
            gen_walk_stand_point();
            buddy.switch_animation(walk_stand_point);
            bounce++;
        } else {
            if(bounce >= max_bounce){
                bounce = 0;
                buddy.switch_animation(mad_boom);
            } else {
                undead = true;
                gen_walk_stand_point();
                buddy.switch_animation(walk_stand_point);
                bounce++;
            }
        }
    }
};

var bounce_right = {
    loop: false,
    order: [
        ['bounce_right', '2x', 50],
        //  ['stand', 10, 500],
    ],
    done: function(){
        setErr();
        if(undead){
            undead = false;
            gen_walk_stand_point();
            buddy.switch_animation(walk_stand_point);
            bounce++;
        } else {
            if(bounce >= max_bounce){
                bounce = 0;
                buddy.switch_animation(mad_boom);
            } else {
                undead = true;
                gen_walk_stand_point();
                buddy.switch_animation(walk_stand_point);
                bounce++;
            }
        }
    }
};

var mad_boom = {
    loop: false,
    order: [
        ['mad', '2x', 100],
        ['boom', '1x', 100],
    ],
    done: function(){
        undead = Math.floor(Math.random() * (100 + 1) + 1) > 50;
        gen_walk_stand_point();
        buddy.switch_animation(walk_stand_point);
    }
};

var walk_stand_point = {
    loop: true,
    order: [
        //mode, length, speed
        ['shuffle_right', 40, 400],
        ['walk_right', 5, 200],
        ['walk_left', 50, 200],
        ['stand', 10, 500],
        ['walk_right', 10, 200],
        ['point', 20, 200],
        ['stand', 7, 500],
        ['point', 25, 200],
    ],
    hit_wall: function(side){
        if(side === 'right'){
            buddy.switch_animation(bounce_left);
        } else {
            buddy.switch_animation(bounce_right);
        }
    }
};

//generates a random order array for walk_stand_point
function gen_walk_stand_point()
{
    walk_stand_point.order = [];

    for(var i = 0; i < 6; i++){
        var action = Math.floor(Math.random() * (100 + 1) + 1);

        //zombie
        // if(undead){
        //     if(action > 66){
                walk_stand_point.order.push([
                    'shuffle_right',
                    Math.floor(Math.random() * (40 - 5) + 5),
                    Math.floor(Math.random() * (600 - 500) + 500)
                ]);
        //     } else if(action > 33){
                walk_stand_point.order.push([
                    'shuffle_left',
                    Math.floor(Math.random() * (40 - 5) + 5),
                    Math.floor(Math.random() * (600 - 500) + 500)
                ]);
        //     } else {
                walk_stand_point.order.push([
                    'zombie_stand',
                    Math.floor(Math.random() * (30 - 10) + 10),
                    Math.floor(Math.random() * (1000 - 800) + 800)
                ]);
            // }
        // }
        //stick buddy
        // else
        // {
        //     if(action > 80){
        //         walk_stand_point.order.push([
        //             'walk_right',
        //             Math.floor(Math.random() * (30 - 5) + 5),
        //             Math.floor(Math.random() * (200 - 150) + 150)
        //         ]);
        //     } else if(action > 60) {
        //         walk_stand_point.order.push([
        //             'walk_left',
        //             Math.floor(Math.random() * (30 - 5) + 5),
        //             Math.floor(Math.random() * (200 - 150) + 150)
        //         ]);
        //     } else if(action > 40) {
        //         walk_stand_point.order.push([
        //             'stand',
        //             Math.floor(Math.random() * (10 - 5) + 5),
        //             Math.floor(Math.random() * (500 - 400) + 400)
        //         ]);
        //     } else {
        //         walk_stand_point.order.push([
        //             'point',
        //             Math.floor(Math.random() * (30 - 20) + 20),
        //             Math.floor(Math.random() * (300 - 200) + 200)
        //         ]);
        //     }
        // }
    }
}


function animate_multi(ani_method_obj, ani_frames_obj, target, target_container, parent) {
    var _this = this;
    var current_frame = 0;
    var current_length = 0;
    var inside_box_offset = parent.offsetWidth - target.offsetWidth;

    this.speak = false;
    this.order_i = 0;
    this.offset =  Math.floor(Math.random() * inside_box_offset) + 1;
    target_container.setAttribute('style', 'left:' + this.offset + 'px');

    this.ani_method_obj = ani_method_obj;
    this.ani_frames_obj = ani_frames_obj;

    this.animate = function()
    {
        current_frame = 0;
        current_length = 0;

        _this.stepper = setInterval(function()
        {
            if(!_this.current_ani.ani[current_frame]){
                //console.log(2, current_frame, _this.current_ani);
                //debugger;
            }

            //no loop
            if(_this.loop === false &&
                _this.order_i >= _this.ani_method_obj.order.length - 1 &&
                current_length >= _this.current_length)
            {
                clearInterval(_this.stepper);
                if(_this.ani_method_obj.done){
                    _this.ani_method_obj.done();
                }
            }
            //loop
            else
            {
                //looped for length, next method
                if(current_length >= _this.current_length){
                    clearInterval(_this.stepper);
                    _this.set_mode(_this.order_i + 1);
                    _this.animate();
                }
                else
                {

                    target.innerHTML = _this.current_ani.ani[current_frame];

                    if(_this.current_ani.speech){
                        var bubble = document.getElementById('bubble');
                        var show_speech = Math.floor(Math.random() * (100 + 1) + 1);

                        if((_this.speak == false && show_speech > 50) || show_speech > 75){
                            var half_point = inside_box_offset / 2;
                            if(_this.offset > half_point){
                                bubble.setAttribute('class', 'point-left');
                            } else {
                                bubble.setAttribute('class', 'point-right');
                            }
                            _this.speak = _this.current_ani.speech[Math.floor(Math.random() * _this.current_ani.speech.length)];
                            bubble.innerHTML = _this.speak;
                            bubble.setAttribute('style', 'display:block;');
                        }
                    }

                    if(_this.current_ani.offset){
                        var new_offset = _this.offset + _this.current_ani.offset;

                        //hit left wall
                        if(new_offset < 0){
                            if(_this.ani_method_obj.hit_wall)
                            {
                                _this.offset = 0;
                                clearInterval(_this.stepper);
                                target_container.setAttribute('style', 'left:0px');
                                _this.ani_method_obj.hit_wall('left');
                            }
                        }
                        //hit right wall
                        else if (new_offset > inside_box_offset){
                            if(_this.ani_method_obj.hit_wall)
                            {
                                _this.offset = inside_box_offset;
                                clearInterval(_this.stepper);
                                target_container.setAttribute('style', 'left:' + inside_box_offset + 'px');
                                _this.ani_method_obj.hit_wall('right');
                            }
                        }
                        else
                        {
                            _this.offset = new_offset;
                            target_container.setAttribute('style', 'left:' + _this.offset + 'px');
                        }
                    }

                    current_frame++;
                    current_length++;

                    if(current_frame >= _this.current_ani.ani.length) current_frame = 0;
                }
            }
        }, _this.current_speed);
    }

    this.get_current_frame = function() {
        return current_frame;
    }

    this.set_frames = function()
    {
        for(var i = 0; i < _this.current_ani.ani.length; i++) {
            //corrupt buddy
            if(error){
                var frame_arr = _this.current_ani.ani[i].split('');
                var corrupt_char =  Math.floor(Math.random() * frame_arr.length - 1) + 1;
                if(frame_arr[corrupt_char] && !frame_arr[corrupt_char].match(/\s/g)){
                    var rand_index = Math.floor(Math.random() * rand_char.length);
                    var rand = rand_char.charAt(rand_index);
                    frame_arr[corrupt_char] = rand;
                    _this.current_ani.ani[i] = frame_arr.join('');
                }
            }
            _this.current_ani.ani[i] = _this.current_ani.ani[i].replace(/ /g,"&nbsp;");
            _this.current_ani.ani[i] = "<pre>" + _this.current_ani.ani[i] + "</pre>";
        }

        if(!_this.current_ani.ani[0]){
            //console.log(1, 0, _this.current_ani);
        }

        var classes = _this.current_ani.color ? _this.current_ani.color : 'fg08';
        target.setAttribute('class', classes);

        if(!_this.current_ani.speech){
            document.getElementById('bubble').setAttribute('style', 'display:none');
            _this.speak = false;
        }

        target.innerHTML = _this.current_ani.ani[0];
    }

    this.set_mode = function(order_i2, ani_method_obj2)
    {
        if(ani_method_obj2){
            _this.ani_method_obj = ani_method_obj2;
        }

        if(order_i2 >= _this.ani_method_obj.order.length){
            _this.order_i = 0;
        } else {
            _this.order_i = order_i2;
        }

        _this.current_mode = _this.ani_method_obj.order[_this.order_i][0];
        _this.current_speed = _this.ani_method_obj.order[_this.order_i][2];

        //we don't wanna modify our main ani_frames object
        _this.current_ani = JSON.parse(JSON.stringify(_this.ani_frames_obj[_this.current_mode]));
        _this.current_ani.color = _this.ani_frames_obj[_this.current_mode].color();
        _this.loop = _this.ani_method_obj.loop === false ? false : true;

        var new_current_length = _this.ani_method_obj.order[_this.order_i][1];
        if(isNaN(new_current_length))
        {
            var times = +new_current_length.split('x')[0];
            _this.current_length = +times * _this.current_ani.ani.length;
        } else if(!isNaN(new_current_length)) {
            _this.current_length = new_current_length;
        }

        _this.set_frames();
    }

    this.set_mode(0, ani_method_obj);
    this.animate();

    current_frame++;
}

animate_multi.prototype.stop_animation = function() {
    clearInterval(this.stepper);
}

animate_multi.prototype.switch_animation = function(ani_method_obj) {
    clearInterval(this.stepper);
    this.set_mode(0, ani_method_obj);
    this.animate();
}

if(document.getElementById('buddy'))
{
    buddy_arr = {
        shuffle_right: {
            ani: [
                ' 0,\n'+
                ' )-\n'+
                '\/ \\',

                '0\/\n'+
                ' \\▔\n'+
                ' ▏╲',

                ' 0_\n'+
                '\/\\ \n'+
                '▏\\',

                ' 0▁\n'+
                '(\\ \n'+
                '\/| ',

                '0_ \n'+
                '▕\\ \n'+
                '\/| ',

                ' 0_\n'+
                '\/- \n'+
                '▏\\ ',

                '0/ \n'+
                ' )▔\n'+
                '\/ \\',

                ' .ᴑ\n'+
                '\/|\\ \n'+
                '\/ \\',

                ' 0_\n'+
                ' |\ \n'+
                '\/ \\'
            ],
            offset: remToPx(.5),
            color: function(){ return error ? 'fg04' : 'fg09'; },
            speech: [
                'rawrr',
                'rrrr'
            ]
        },
        shuffle_left: {
            ani: [
                '`0 \n'+
                '-( \n'+
                '\/ \\',

                '\\0 \n'+
                '-/ \n'+
                '/| ',

                '_0 \n'+
                ' \/\\ \n'+
                ' \/▕',

                '▁0 \n'+
                ' \/)\n'+
                ' |\\',

                ' _0\n'+
                ' \/▏\n'+
                ' |\\',

                '_0 \n'+
                ' -\\ \n'+
                ' \/▕',

                '\\0 \n'+
                '▔( \n'+
                '\/ \\',

                'ᴑ. \n'+
                '\/|\\ \n'+
                '\/ \\',

                '_0 \n'+
                '\/| \n'+
                '\/ \\'
            ],
            offset: -remToPx(.5),
            color: function(){ return error ? 'fg04' : 'fg09'; },
            speech: [
                'nnng',
                'braains',
                'guuh',
                'rrrr'
            ]
        },
        zombie_stand: {
            ani: [
                ' 0 \n'+
                '\/|\\ \n'+
                '\/ \\',

                'ᴑ. \n'+
                '\/)\\ \n'+
                '\/ \\',
                'ᴑ. \n'+
                '\/)\\ \n'+
                '\/ \\',
                'ᴑ. \n'+
                '\/)\\ \n'+
                '\/ \\',

                ' 0 \n'+
                '\/|\\ \n'+
                '\/ \\',

                ' .ᴑ\n'+
                '\/(\\ \n'+
                '\/ \\',
                ' .ᴑ\n'+
                '\/(\\ \n'+
                '\/ \\',
                ' .ᴑ\n'+
                '\/(\\ \n'+
                '\/ \\',
            ],
            offset: 0,
            color: function(){ return error ? 'fg04' : 'fg09'; },
            speech: [
                'just need a little hug from oci :(',
                // 'little hug',
                // 'from oci <3',
            ]
        },
        walk_right: {
            ani: [
                ' 0 \n' +
                '╭|\\ \n' +
                '\/ \\',

                ' 0 \n' +
                '<|\ \n' +
                '/| ',

                ' 0 \n' +
                ' < \n' +
                ' |>',

                ' 0 \n' +
                '<|-\n' +
                '/ >'
            ],
            offset: remToPx(.7),
            color: function(){ return 'fg08'; },
        },
        walk_left: {
            ani: [
                ' 0 \n' +
                '\/|╮ \n' +
                '\/ \\',

                ' 0 \n' +
                '\/|> \n' +
                ' |\\ ',

                ' 0 \n' +
                ' > \n' +
                '<| ',

                ' 0 \n' +
                '-|>\n' +
                '< \\ '
            ],
            offset: -remToPx(.7),
            color: function(){ return 'fg08'; },
        },
        stand: {
            ani: [
                ' 0 \n' +
                '/|\\ \n' +
                '\/ \\',

                ' 0 \n' +
                '<|\ \n' +
                '\/| ',
                ' 0 \n' +
                '<|\ \n' +
                '\/| ',
                ' 0 \n' +
                '<|\ \n' +
                '\/| ',

                ' 0 \n' +
                '/|\\ \n' +
                '\/ \\',
                ' 0 \n' +
                '/|\\ \n' +
                '\/ \\',
                ' 0 \n' +
                '/|\\ \n' +
                '\/ \\',

                ' 0 \n' +
                '/|>\n' +
                ' |\\',

                ' 0 \n' +
                '/|\\ \n' +
                '\/ \\',
                ' 0 \n' +
                '/|\\ \n' +
                '\/ \\',
                ' 0 \n' +
                '/|\\ \n' +
                '\/ \\',

                ' 0 \n' +
                '<|>\n' +
                '\/ \\',
                ' 0 \n' +
                '<|>\n' +
                '\/ \\',
                ' 0 \n' +
                '<|>\n' +
                '\/ \\',

                '<0 \n' +
                ' |\\ \n' +
                '\/ \\',
                '<0 \n' +
                ' |\\ \n' +
                '\/ \\',

                '<0 \n' +
                ' |\\ \n' +
                ' |\\',

                '<0 \n' +
                ' |\\ \n' +
                '\/ \\',
                '<0 \n' +
                ' |\\ \n' +
                '\/ \\',
            ],
            offset: 0,
            color: function(){ return 'fg08'; },
        },
        point: {
            ani: [
                ' 0 \n' +
                '/|┘\n' +
                '\/ \\',

                ' 0\/\n' +
                '/| \n' +
                '\/ \\',

                ' 0 \n' +
                '/|┘\n' +
                '\/ \\',

                ' 0\/\n' +
                '/| \n' +
                '\/ \\',

                ' 0 \n' +
                '/|┘\n' +
                '\/ \\',

                ' 0\/\n' +
                '/| \n' +
                '\/ \\',

                ' 0 \n' +
                '<|>\n' +
                '\/ \\',
                ' 0 \n' +
                '<|>\n' +
                '\/ \\',
                ' 0 \n' +
                '<|>\n' +
                '\/ \\',
                ' 0 \n' +
                '<|>\n' +
                '\/ \\',

                ' 0 \n' +
                '/|\\ \n' +
                '\/ \\',
                ' 0 \n' +
                '/|\\ \n' +
                '\/ \\',

                ' 0 \n' +
                '<|>\n' +
                '\/ \\',
                ' 0 \n' +
                '<|>\n' +
                '\/ \\'
            ],
            offset: 0,
            color: function(){ return 'fg08'; },
            speech: [
                'look!',
                'hey!',
                'up there!',
                'oi!',
            ]
        },
        bounce_right: {
            ani: [
                '0  \n'+
                '\/) \n'+
                '\/\/ \n',

                '0  \n'+
                '\/\_\n'+
                '  \\',

                '  \/\n'+
                'ᴑ---\n'+
                ' ╯ ',

                '   _\n'+
                'ᴑ---\n'+
                ' ╯ ',

                '   \n'+
                ' 0 \n'+
                '\/|__',

                ' 0 \n'+
                '/| \n'+
                ' >>\n'
            ],
            offset: remToPx(1),
            color: function(){ return 'fg08'; },
        },
        bounce_left: {
            ani: [
                '  0\n'+
                ' )\\ \n'+
                ' \\\\ \n',

                '  0\n'+
                '-\/\ \n'+
                '\/  ',

                '\\  \n'+
                '---ᴑ\n'+
                ' ╰ ',

                '_   \n'+
                '---ᴑ\n'+
                ' ╰ ',

                '   \n'+
                ' 0 \n'+
                '__|\\',

                ' 0 \n'+
                ' |\\ \n'+
                '<< \n'
            ],
            offset: -remToPx(1),
            color: function(){ return 'fg08'; },
        },
        mad: {
            ani: [
                ' 0 \n'+
                '<|>\n'+
                '\/ \\',
                ' 0 \n'+
                '<|>\n'+
                '\/ \\',
                ' 0 \n'+
                '<|>\n'+
                '\/ \\',

                ' 0 \n'+
                '<|╯\n'+
                '\/ \\',

                ' 0 \n'+
                '╰|╯\n'+
                '\/ \\',

                '\\0\/\n'+
                ' | \n'+
                '\/ \\',

                ' 0 \n'+
                '╰|╯\n'+
                '\/ \\',

                '\\0\/\n'+
                ' | \n'+
                '\/ \\',

                ' 0 \n'+
                '╰|╯\n'+
                '\/ \\',

                '\\0\/\n'+
                ' | \n'+
                '\/ \\',
            ],
            offset: 0,
            color: function(){ return 'fg07'; },
            speech: [
                'wtf',
                'really?!',
                'let me out!!'
            ]
        },
        boom: {
            ani: [
                '\\V\/\n'+
                ' | \n'+
                '\/ \\',

                '`*\/\n'+
                '   \n'+
                '\/ `',

                '.  \n'+
                '  `\n'+
                '.` ',

                '   \n'+
                '   \n'+
                '.`,',

                '   \n'+
                '   \n'+
                ',, ',

                '   \n'+
                '   \n'+
                '   ',
                '   \n'+
                '   \n'+
                '   ',
                '   \n'+
                '   \n'+
                '   ',
            ],
            offset: 0,
            color: function(){ return 'fg07'; },
            speech: [
                'wtf',
                'really?!',
                'let me out!!'
            ]
        }
    };

    gen_walk_stand_point();
    var buddy = new animate_multi(
        walk_stand_point,
        buddy_arr,
        document.getElementById('buddy_ani'),
        document.getElementById('buddy'),
        document.getElementById('buddy_path')
    );
}