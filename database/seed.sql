-- === Example Salon Data (fictional stylists and services) ===
USE beauty_calendar;

INSERT INTO services (id, name, description, price, duration_minutes) VALUES
(1, 'Signature Haircut', 'A personalized cut and finish for your everyday style.', 55.00, 60),
(2, 'Blowout & Style', 'Smooth, bouncy, and beautifully finished hair.', 40.00, 45),
(3, 'All-Over Color', 'Rich, beautiful color customized for you.', 110.00, 120),
(4, 'Highlights', 'Dimension and brightness with hand-placed highlights.', 145.00, 150),
(5, 'Deep Conditioning', 'A restorative treatment for soft, healthy-looking hair.', 35.00, 30),
(6, 'Special Occasion Style', 'A polished look for your big day or special event.', 85.00, 90)
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description), price = VALUES(price), duration_minutes = VALUES(duration_minutes);

INSERT INTO stylists (id, name, specialty, bio) VALUES
(1, 'Avery Bennett', 'Cuts & Styling', 'Avery loves creating effortless, wearable looks that feel uniquely you.'),
(2, 'Jordan Ellis', 'Color Specialist', 'Jordan brings dimension, warmth, and creativity to every color appointment.'),
(3, 'Morgan Lane', 'Events & Treatments', 'Morgan specializes in special occasion styles and restorative hair care.')
ON DUPLICATE KEY UPDATE name = VALUES(name), specialty = VALUES(specialty), bio = VALUES(bio);

INSERT IGNORE INTO stylist_services (stylist_id, service_id) VALUES
(1,1),(1,2),(1,5),(2,1),(2,3),(2,4),(2,5),(3,2),(3,5),(3,6);
