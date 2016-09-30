
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
      username:'met2002',
      password:'$2a$04$WQ5mKUP.mi2TogXpVHLDmuMhFA/iGOGCM4uTdhDJCaZYj0hBBpIoC',
      email:'heather.steward52@example.com',
      about_me:'Another one. How’s business? Boomin. A major key, never panic. Don’t panic, when it gets crazy and rough, don’t panic, stay calm. Don’t ever play yourself. The key to success is to keep your head above the water, never give up. The key is to enjoy life, because they don’t want you to enjoy life.',
      profile_url:'https://randomuser.me/api/portraits/women/13.jpg',
      full_name:'Jessica'
    }),
    knex('users').insert({
      username:'daman',
      password:'$2a$04$WQ5mKUP.mi2TogXpVHLDmuMhFA/iGOGCM4uTdhDJCaZYj0hBBpIoC',
      email:'aubree.berry57@example.com',
      about_me:' I promise you, they don’t want you to jetski, they don’t want you to smile. Find peace, life is like a water fall, you’ve gotta flow. They will try to close the door on you, just open it.',
      profile_url:'https://randomuser.me/api/portraits/women/29.jpg',
      full_name:'Also Jessica'
    }),
    knex('users').insert({
      username:'wayne',
      password:'$2a$04$WQ5mKUP.mi2TogXpVHLDmuMhFA/iGOGCM4uTdhDJCaZYj0hBBpIoC',
      email:'byron.ford12@example.com',
      about_me:'You do know, you do know that they don’t want you to have lunch. I’m keeping it real with you, so what you going do is have lunch. Watch your back, but more importantly when you get out the shower, dry your back, it’s a cold world out there.',
      profile_url:'https://randomuser.me/api/portraits/men/29.jpg',
      full_name:'Not Jessica'
    })
  );
};
